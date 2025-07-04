import styles from './CardInput.module.css';

const CardInput = ({ value, placeholder, onChange, label }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default CardInput;
