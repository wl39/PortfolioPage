import { classnames } from '../../utils/classnames';
import Card from '../Card/Card';
import Cross from '../Cross/Cross';
import styles from './Modal.module.css';

function Modal({ children, hide, cardStyles }) {
  return !hide ? (
    <div className={styles.background}>
      <Card propStyles={classnames([cardStyles, styles.container])}>
        {/* <Cross size={16} line={3} onClick={() => close()} /> */}
        {children}
      </Card>
    </div>
  ) : null;
}

export default Modal;
