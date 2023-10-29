interface Props {
  type: JSX.IntrinsicElements['input']['type'];
  value: JSX.IntrinsicElements['input']['value'];
  onClick: JSX.IntrinsicElements['input']['onClick'];
  className?: string;
  checked?: JSX.IntrinsicElements['input']['checked'];
  id?: JSX.IntrinsicElements['input']['id'];
}

export const Input = ({
  type,
  value,
  onClick,
  className,
  checked = false,
  id,
}: Props) => {
  return (
    <label className={className}>
      <input
        type={type}
        id={id}
        value={value}
        name={value?.toString()}
        onClick={onClick}
        defaultChecked={checked}
      />
      {value}
    </label>
  );
};
