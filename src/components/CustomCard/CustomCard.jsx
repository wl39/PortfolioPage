import React from "react";
import styles from "./CustomCard.module.css";

class CustomCard extends React.Component {
  constructor(props) {
    super(props);

    let divDescription;

    console.log(props.description);

    props.heighlight.forEach((value) => {
      console.log(value);
    });

    this.state = {
      open: false,
      cardStyle: styles.card,
      description: null,
    };
  }

  onMouseEnter = () => {
    this.setState({
      open: true,
      cardStyle: styles.cardMouseEnter,
    });
  };

  onMouseOut = () => {
    this.setState({
      open: false,
      cardStyle: styles.card,
    });
  };

  render() {
    return (
      <div
        className={this.state.cardStyle}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseOut}
      >
        <div className={styles.title}>{this.props.title}</div>
        <div>
          <img alt={"logo"} src={this.props.logo} className={styles.logo} />
        </div>
        <p className={styles.description}>{this.props.description}</p>
      </div>
    );
  }
}

export default CustomCard;
