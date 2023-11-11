import styles from '@/styles/components/input.module.scss';

interface Props {
  type: JSX.IntrinsicElements['input']['type'];
  value: JSX.IntrinsicElements['input']['value'];
  onClick: JSX.IntrinsicElements['input']['onClick'];
  className?: string;
  checked?: JSX.IntrinsicElements['input']['checked'];
  name?: JSX.IntrinsicElements['input']['name'];
  id?: JSX.IntrinsicElements['input']['id'];
}

export const Input = ({
  type,
  value,
  onClick,
  className,
  checked = false,
  name,
  id,
}: Props) => {
  return (
    <div className={className}>
      <label className={styles.pointer}>
        <input
          type={type}
          id={id}
          value={value}
          name={name ?? value?.toString()}
          onClick={onClick}
          defaultChecked={checked}
          className={styles.pointer}
        />
        {value}
      </label>
    </div>
  );
};
