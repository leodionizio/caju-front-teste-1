import { InputHTMLAttributes, forwardRef } from "react";
import { useMask } from "@react-input/mask";
import * as S from "./styles";

type Props = {
  label?: string;
  error?: string;
  mask?: string;
  maskReplacement?: RegExp;
} & InputHTMLAttributes<any>;

const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { id, label, error, mask, maskReplacement, ...rest } = props;
  const inputRef = useMask({
    mask,
    replacement: maskReplacement ? { _: maskReplacement } : "_",
  });

  return (
    <S.InputContent>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input
        {...rest}
        id={id}
        ref={mask ? (inputRef as any) : ref}
        hasError={!!error}
      />
      <S.ErrorMessage>{error}</S.ErrorMessage>
    </S.InputContent>
  );
});

export default TextField;
