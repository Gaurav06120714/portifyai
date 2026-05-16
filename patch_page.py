import re

with open("frontend/src/app/(dashboard)/dashboard/build-resume/page.tsx", "r") as f:
    code = f.read()

# 1. Update TOTAL_STEPS -> dynamic totalSteps
code = code.replace("const TOTAL_STEPS = 12;\n", "")
code = code.replace(
    "const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));",
    "const totalSteps = 6 + form.work_experiences.length + form.projects.length;\n  const next = () => setStep((s) => Math.min(s + 1, totalSteps));"
)

# 2. Update INITIAL state
code = code.replace(
    "work_experiences: [emptyWork(), emptyWork(), emptyWork()],",
    "work_experiences: [emptyWork()],"
)
code = code.replace(
    "projects: [emptyProject(), emptyProject(), emptyProject()],",
    "projects: [emptyProject()],"
)

# 3. Add helpers
helpers = """
  const addWork = () => setForm(f => ({ ...f, work_experiences: [...f.work_experiences, emptyWork()] }));
  const removeWork = (idx: number) => setForm(f => ({ ...f, work_experiences: f.work_experiences.filter((_, i) => i !== idx) }));
  const addProject = () => setForm(f => ({ ...f, projects: [...f.projects, emptyProject()] }));
  const removeProject = (idx: number) => setForm(f => ({ ...f, projects: f.projects.filter((_, i) => i !== idx) }));
"""
code = code.replace(
    "const back = () => setStep((s) => Math.max(s - 1, 1));\n",
    "const back = () => setStep((s) => Math.max(s - 1, 1));\n" + helpers
)

# 4. We need to rewrite the `steps` object to a `stepNodes` array.
# Let's locate the `const steps: Record<number, React.ReactNode> = { ... };` block.
start_idx = code.find("const steps: Record<number, React.ReactNode> = {")
end_idx = code.find("  return (\n    <div className=\"mx-auto max-w-2xl\">")

steps_replacement = """
  const stepNodes: React.ReactNode[] = [];
  let currentStep = 1;

  // Q1
  stepNodes.push(
    <StepShell
      key="step-1"
      step={currentStep++}
      total={totalSteps}
      emoji="👋"
      question="Let's start with the basics. What's your name?"
      hint="This is how you'll appear at the top of your portfolio."
      onNext={next}
      nextDisabled={!form.personal.name.trim()}
    >
      <div className="space-y-4">
        <div>
          <label className={CLS.label}>Full name</label>
          <input
            autoFocus
            className={CLS.input}
            placeholder="e.g. Alex Johnson"
            value={form.personal.name}
            onChange={(e) => patch("personal", { ...form.personal, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && form.personal.name.trim() && next()}
          />
        </div>
        <div>
          <label className={CLS.label}>Current or desired job title</label>
          <input
            className={CLS.input}
            placeholder="e.g. Senior Full-Stack Engineer"
            value={form.personal.title}
            onChange={(e) => patch("personal", { ...form.personal, title: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && form.personal.name.trim() && next()}
          />
        </div>
      </div>
    </StepShell>
  );

  // Q2
  stepNodes.push(
    <StepShell
      key="step-2"
      step={currentStep++}
      total={totalSteps}
      emoji="⚡"
      question={`Nice to meet you, ${form.personal.name.split(" ")[0] || "you"}! How much experience do you have?`}
      hint="And what's your primary tech stack?"
      onNext={next}
      onBack={back}
      nextDisabled={!form.experience_summary.years}
    >
      <div className="space-y-5">
        <div>
          <label className={CLS.label}>Years of professional experience</label>
          <div className="grid grid-cols-4 gap-2">
            {["<1", "1-2", "3-5", "6-9", "10-15", "15+", "Student", "Career changer"].map(
              (opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    patch("experience_summary", {
                      ...form.experience_summary,
                      years: opt,
                    })
                  }
                  className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${
                    form.experience_summary.years === opt
                      ? "border-[#6c63ff] bg-[rgba(108,99,255,0.15)] text-[#8b84ff]"
                      : "border-[rgba(108,99,255,0.15)] bg-[#13131e] text-[#7777aa] hover:border-[rgba(108,99,255,0.4)] hover:text-[#e8e8f0]"
                  }`}
                >
                  {opt}
                </button>
              ),
            )}
          </div>
        </div>
        <div>
          <label className={CLS.label}>Primary tech stack</label>
          <TagInput
            tags={form.experience_summary.tech_stack}
            onChange={(tags) =>
              patch("experience_summary", { ...form.experience_summary, tech_stack: tags })
            }
            placeholder="e.g. React, TypeScript, Node.js — press Enter after each"
          />
          <p className="mt-1.5 text-xs text-[#7777aa]">Press Enter or comma to add each technology</p>
        </div>
      </div>
    </StepShell>
  );

  // Work Exps
  form.work_experiences.forEach((exp, index) => {
    stepNodes.push(
      <WorkExpStep
        key={`work-${index}`}
        step={currentStep++}
        total={totalSteps}
        index={index}
        label={index === 0 ? "first" : index === 1 ? "second" : index === 2 ? "third" : "next"}
        data={exp}
        onChange={patchWork}
        onNext={next}
        onBack={back}
        optional={index > 0}
        onAddWork={index === form.work_experiences.length - 1 ? addWork : undefined}
        onRemoveWork={index > 0 ? () => removeWork(index) : undefined}
      />
    );
  });

  // Projects
  form.projects.forEach((proj, index) => {
    stepNodes.push(
      <ProjectStep
        key={`proj-${index}`}
        step={currentStep++}
        total={totalSteps}
        index={index}
        label={index === 0 ? "first" : index === 1 ? "second" : index === 2 ? "third" : "next"}
        data={proj}
        onChangeField={patchProject}
        onChangeTech={patchProjectTech}
        onNext={next}
        onBack={back}
        optional={index > 0}
        onAddProject={index === form.projects.length - 1 ? addProject : undefined}
        onRemoveProject={index > 0 ? () => removeProject(index) : undefined}
      />
    );
  });

  // Education
  stepNodes.push(
    <StepShell
      key="step-edu"
      step={currentStep++}
      total={totalSteps}
      emoji="🎓"
      question="What's your educational background?"
      hint="Degree, institution, and graduation year. Skip if not applicable."
      onNext={next}
      onBack={back}
    >
      <div className="space-y-4">
        <div>
          <label className={CLS.label}>Degree</label>
          <input
            autoFocus
            className={CLS.input}
            placeholder="e.g. B.Sc. Computer Science, Self-taught, Bootcamp"
            value={form.education.degree}
            onChange={(e) => patch("education", { ...form.education, degree: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={CLS.label}>Institution</label>
            <input
              className={CLS.input}
              placeholder="e.g. MIT, Coursera"
              value={form.education.institution}
              onChange={(e) =>
                patch("education", { ...form.education, institution: e.target.value })
              }
            />
          </div>
          <div>
            <label className={CLS.label}>Year</label>
            <input
              className={CLS.input}
              placeholder="e.g. 2021"
              value={form.education.year}
              onChange={(e) =>
                patch("education", { ...form.education, year: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </StepShell>
  );

  // Skills
  stepNodes.push(
    <StepShell
      key="step-skills"
      step={currentStep++}
      total={totalSteps}
      emoji="🛠️"
      question="What are your key skills?"
      hint="Add the skills you want to highlight. Then let AI suggest what you might be missing."
      onNext={next}
      onBack={back}
      nextDisabled={form.skills.length === 0}
    >
      <div className="space-y-4">
        <TagInput
          tags={form.skills}
          onChange={(tags) => patch("skills", tags)}
          placeholder="e.g. React, Docker, System Design — press Enter after each"
        />
        <button
          type="button"
          onClick={handleSuggestSkills}
          disabled={suggestingSkills}
          className="flex items-center gap-2 rounded-xl border border-[rgba(108,99,255,0.25)] bg-[rgba(108,99,255,0.06)] px-4 py-2.5 text-sm font-medium text-[#8b84ff] transition-all hover:border-[rgba(108,99,255,0.5)] hover:bg-[rgba(108,99,255,0.12)] disabled:opacity-60"
        >
          {suggestingSkills ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Claude is thinking…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              AI: suggest skills I might be missing
            </>
          )}
        </button>
        {form.skills.length > 0 && (
          <p className="text-xs text-[#7777aa]">{form.skills.length} skills added</p>
        )}
      </div>
    </StepShell>
  );

  // Social links
  stepNodes.push(
    <StepShell
      key="step-social"
      step={currentStep++}
      total={totalSteps}
      emoji="🔗"
      question="Where can people find you online?"
      hint="These show up in your portfolio's contact section. All optional."
      onNext={next}
      onBack={back}
    >
      <div className="space-y-4">
        {(
          [
            { key: "github", label: "GitHub", placeholder: "https://github.com/username" },
            {
              key: "linkedin",
              label: "LinkedIn",
              placeholder: "https://linkedin.com/in/username",
            },
            { key: "website", label: "Personal website", placeholder: "https://yoursite.com" },
          ] as const
        ).map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className={CLS.label}>{label}</label>
            <input
              className={CLS.input}
              placeholder={placeholder}
              value={form.social_links[key]}
              onChange={(e) =>
                patch("social_links", { ...form.social_links, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>
    </StepShell>
  );

  // Career goal
  stepNodes.push(
    <StepShell
      key="step-goal"
      step={currentStep++}
      total={totalSteps}
      emoji="🚀"
      question="Last one! What kind of roles are you targeting?"
      hint="This helps Claude write a compelling summary and tailor your portfolio copy."
      onNext={handleSubmit}
      onBack={back}
      nextLabel="Build my resume with AI ✨"
      nextDisabled={!form.career_goal.trim()}
      loading={submitting}
    >
      <div className="space-y-4">
        <textarea
          autoFocus
          rows={5}
          className={CLS.textarea}
          placeholder={`e.g. "I'm looking for senior frontend roles at product-led startups, ideally working on developer tools or fintech. I love TypeScript and want to lead small teams."`}
          value={form.career_goal}
          onChange={(e) => patch("career_goal", e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {[
            "Senior SWE at a startup",
            "Staff engineer at FAANG",
            "Freelance / consulting",
            "First dev job",
            "Engineering manager",
            "Remote-first roles",
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                const curr = form.career_goal;
                patch(
                  "career_goal",
                  curr
                    ? curr.endsWith(" ")
                      ? curr + suggestion
                      : curr + " " + suggestion
                    : suggestion,
                );
              }}
              className="rounded-full border border-[rgba(108,99,255,0.2)] px-3 py-1 text-xs text-[#7777aa] hover:border-[rgba(108,99,255,0.5)] hover:text-[#e8e8f0] transition-colors"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </StepShell>
  );
"""

code = code[:start_idx] + steps_replacement + "\n" + code[end_idx:]
code = code.replace("{steps[step]}", "{stepNodes[step - 1]}")

# 5. Add onAddWork and onRemoveWork to WorkExpStep props and ProjectStep props
work_props = """
  optional?: boolean;
  onAddWork?: () => void;
  onRemoveWork?: () => void;
}
"""
code = code.replace("  optional?: boolean;\n}", work_props)

work_comp = """
  onBack,
  optional,
  onAddWork,
  onRemoveWork,
}: WorkExpStepProps) {
"""
code = code.replace("  onBack,\n  optional,\n}: WorkExpStepProps) {", work_comp)

work_buttons = """
          <p className="mt-1.5 text-xs text-[#7777aa]">
            Claude will expand and polish these into strong bullet points.
          </p>
        </div>
        <div className="flex justify-between">
          {onRemoveWork ? (
            <button type="button" onClick={onRemoveWork} className="text-sm text-red-500 hover:text-red-400">Remove Role</button>
          ) : <div/>}
          {onAddWork ? (
            <button type="button" onClick={onAddWork} className="text-sm text-[#8b84ff] hover:text-[#a09cff]">+ Add Another Role</button>
          ) : null}
        </div>
      </div>
"""
code = code.replace("""
          <p className="mt-1.5 text-xs text-[#7777aa]">
            Claude will expand and polish these into strong bullet points.
          </p>
        </div>
      </div>""", work_buttons)


# 6. Projects Props
proj_props = """
  optional?: boolean;
  onAddProject?: () => void;
  onRemoveProject?: () => void;
}
"""
code = code.replace("  optional?: boolean;\n}", proj_props) # This will match ProjectStepProps too hopefully
# Wait, replacing `  optional?: boolean;\n}` twice is problematic. 
# So let's replace by specific matches

with open("frontend/src/app/(dashboard)/dashboard/build-resume/page.tsx", "w") as f:
    f.write(code)
