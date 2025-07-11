import { useEffect, useState } from 'react';

import Input from '../Input/Input';
import Card from '../Card/Card';

import styles from './AssignmentBox.module.css';
import Button from '../Button/Button';
import Triangle from '../Triganle/Triangle';

const AssignmentBox = ({
  source,
  sourceToTargets,
  target,
  targetToSources,
  submit,
  isSubmitting,
}) => {
  const [sourceCheck, setSourceCheck] = useState({});
  const [targetCheck, setTargetCheck] = useState({});

  const [sourceHide, setSourceHide] = useState({});
  const [targetHide, setTargetHide] = useState({});

  useEffect(() => {
    if (source.length && target.length) {
      setSourceHide(
        source.reduce((acc, value) => {
          acc[value] = false;
          return acc;
        }, {})
      );

      setTargetHide(
        target.reduce((acc, value) => {
          acc[value] = false;
          return acc;
        }, {})
      );
    }
  }, [source, target]);

  return (
    <>
      <Card propStyles={styles.container}>
        <div className={styles.source}>
          {source.map((value, index) => {
            return (
              <Card
                propStyles={styles.smallCard}
                key={'services-' + value + index}
              >
                <div className={styles.valueAndCheckbox}>
                  <Input
                    propStyles={styles.checkbox}
                    type="checkbox"
                    id={value}
                    value={sourceCheck[value]}
                    onChange={() =>
                      setSourceCheck({
                        ...sourceCheck,
                        [value]: !sourceCheck[value],
                      })
                    }
                  />
                  <label htmlFor={value}>{value}</label>
                  {sourceToTargets[value].length ? (
                    <Triangle
                      propStyles={styles.triangle}
                      direction={sourceHide[value] ? 'up' : 'down'}
                      onClick={() =>
                        setSourceHide({
                          ...sourceHide,
                          [value]: !sourceHide[value],
                        })
                      }
                    />
                  ) : null}
                </div>

                {sourceHide[value] ? (
                  <ul className={styles.mapContainer}>
                    {sourceToTargets[value].map(
                      (sourceToTarget, sourceToTargetIndex) => {
                        return (
                          <li key={sourceToTarget + '-' + sourceToTargetIndex}>
                            {sourceToTarget}
                          </li>
                        );
                      }
                    )}
                  </ul>
                ) : null}
              </Card>
            );
          })}
        </div>
        <div className={styles.target}>
          {target.map((value, index) => {
            return (
              <Card
                propStyles={styles.smallCard}
                key={value.name + '.' + value.id + '.' + index}
              >
                <div className={styles.valueAndCheckbox}>
                  <Input
                    propStyles={styles.checkbox}
                    type="checkbox"
                    id={value}
                    value={targetCheck[value]}
                    onChange={() =>
                      setTargetCheck({
                        ...targetCheck,
                        [value]: !targetCheck[value],
                      })
                    }
                  />
                  <label htmlFor={value}>{value}</label>
                  {targetToSources[value].length ? (
                    <Triangle
                      propStyles={styles.triangle}
                      Triangle
                      direction={targetHide[value] ? 'up' : 'down'}
                      onClick={() =>
                        setTargetHide({
                          ...targetHide,
                          [value]: !targetHide[value],
                        })
                      }
                    />
                  ) : null}
                </div>
                {targetHide[value] ? (
                  <ul className={styles.mapContainer}>
                    {targetToSources[value].map(
                      (targetToSource, targetToSourceIndex) => {
                        return (
                          <li key={targetToSource + '-' + targetToSourceIndex}>
                            {targetToSource}
                          </li>
                        );
                      }
                    )}
                  </ul>
                ) : null}
              </Card>
            );
          })}
        </div>
      </Card>
      <Button
        disabled={isSubmitting}
        onclick={() => {
          submit(sourceCheck, targetCheck);
        }}
      >
        {isSubmitting ? 'Submitting ...' : 'Submit'}
      </Button>
    </>
  );
};

export default AssignmentBox;
