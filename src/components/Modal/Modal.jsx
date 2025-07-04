import Card from '../Card/Card';
import Cross from '../Cross/Cross';
import styles from './Modal.module.css';

function Modal({ children, hide, close }) {
  return !hide ? (
    <div className={styles.background}>
      <Card propStyles={styles.container}>
        {/* <Cross size={16} line={3} onClick={() => close()} /> */}
        {children}
      </Card>
    </div>
  ) : null;
}

export default Modal;
