interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function FadeUp({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
