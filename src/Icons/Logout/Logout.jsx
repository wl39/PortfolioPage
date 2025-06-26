const Logout = ({ propStyles }) => {
  return (
    <svg
      className={propStyles}
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      height="40px"
      viewBox="0 0 24 24"
      width="40px"
      fill="#1f1f1f"
    >
      <g>
        <path d="M0,0h24v24H0V0z" fill="none" />
      </g>
      <g>
        <g>
          <polygon points="5,5 12,5 12,3 3,3 3,21 12,21 12,19 5,19" />
          <polygon points="21,12 17,8 17,11 9,11 9,13 17,13 17,16" />
        </g>
      </g>
    </svg>
  );
};

export default Logout;
