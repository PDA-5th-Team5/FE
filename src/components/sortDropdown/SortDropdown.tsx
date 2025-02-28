import { useState } from "react";
import * as S from "./SortDropdown.styled";

interface SortDropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  icon?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

const SortDropdown = ({
  options,
  selected,
  onChange,
  icon,
  isOpen,
  onToggle,
}: SortDropdownProps) => {
  const [localOpen, setLocalOpen] = useState(false);

  const actualIsOpen = isOpen ?? localOpen;
  const actualToggle = () => {
    if (onToggle) {
      // 부모 제어
      onToggle();
    } else {
      // 자체 제어
      setLocalOpen((prev) => !prev);
    }
  };

  const handleSelect = (value: string) => {
    onChange(value);
    if (onToggle) {
      onToggle();
    } else {
      setLocalOpen(false);
    }
  };

  return (
    <>
      <S.SortDropdownContainer>
        <S.SortDropdownButton onClick={actualToggle}>
          {selected}
          {icon && <S.SortKeyIcon src={icon} />}
        </S.SortDropdownButton>

        <S.SortDropdownMenu isOpen={actualIsOpen}>
          {options.map((opt) => (
            <S.SortDropdownItem
              key={opt}
              onClick={() => handleSelect(opt)}
              selected={opt === selected}
            >
              {opt}
            </S.SortDropdownItem>
          ))}
        </S.SortDropdownMenu>
      </S.SortDropdownContainer>
    </>
  );
};

export default SortDropdown;
