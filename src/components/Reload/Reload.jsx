import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Reload = ({ reload, title }) => {
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState('');

  const handleReload = async () => {
    try {
      setLoading(true);
      const response = await reload(target);

      alert(title + ' - Reloaded');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <Input
        value={target}
        placeholder={'Target'}
        onChange={(e) => setTarget(e.target.value)}
      />
      <Button disabled={!target || loading} onclick={handleReload}>
        {loading ? 'LOADING...' : 'RELOAD'}
      </Button>
    </>
  );
};

export default Reload;
