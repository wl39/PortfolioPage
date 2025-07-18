import CardButton from '../CardButton/CardButton';

const OauthButton = ({ provider }) => {
  const redirect = () => {
    window.location.href = process.env.REACT_APP_OAUTH_URL + provider;
  };
  return <CardButton onClick={() => redirect()}>{provider}</CardButton>;
};

export default OauthButton;
