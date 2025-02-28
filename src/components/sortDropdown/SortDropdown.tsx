import * as S from "./SortDropdown.styled";

interface SortDropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  icon?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const SortDropdown = ({
  options,
  selected,
  onChange,
  icon,
  isOpen,
  onToggle,
}: SortDropdownProps) => {
  const handleSelect = (value: string) => {
    onChange(value);
    onToggle();
  };

  return (
    <>
      <S.SortDropdownContainer>
        <S.SortDropdownButton onClick={onToggle}>
          {selected}
          {icon && <S.SortKeyIcon src={icon} />}
        </S.SortDropdownButton>

        <S.SortDropdownMenu isOpen={isOpen}>
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
