import { TitleText } from "./style";

interface ITitleProps {
    text: string;
}

export default function Title({text}: ITitleProps) {
  return (
    <TitleText>{text}</TitleText>
  )
}
