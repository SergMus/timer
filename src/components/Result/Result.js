import React, { Component } from "react";
import styles from "./../Result/Result.module.css";
import { v4 as uuidv4 } from "uuid";

class Result extends Component {
  state = {
    count: 1,
    timeTable: [],
  };

  componentDidMount() {}

  getTime() {
    return `${this.props.cells.current.children[0].innerText}:${this.props.cells.current.children[2].innerText}:${this.props.cells.current.children[4].innerText}`;
  }

  getDate() {
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
      s < 10 ? "0" + s : s
    }`;
  }

  split() {
    this.setState({
      count: this.state.count + 1,
      timeTable: [
        ...this.state.timeTable,
        {
          number: this.state.count,
          result: "result",
          time: this.getTime(),
          date: this.getDate(),
          id: uuidv4(),
        },
      ],
    });
  }

  removeHandler(e) {
    this.setState({
      timeTable: [
        ...this.state.timeTable.filter((item) => {
          return item.id !== e.target.parentNode.parentNode.id;
        }),
      ],
    });
  }
  reverseHandler() {
    this.setState({
      timeTable: [...this.state.timeTable.reverse()],
    });
  }

  render() {
    return (
      <div className={styles.result}>
        {this.state.timeTable.length ? (
          <div className={styles.table_wrap}>
            <label htmlFor="check" className={styles.label}>
              reverse
            </label>
            <input
              type="checkbox"
              className={styles.checkbox}
              id="check"
              onChange={(e) => this.reverseHandler(e)}
            />

            <table className={styles.table}>
              <thead className={styles.table__head}>
                <tr className={styles.table__row__head}>
                  <th
                    role="presentation"
                    className={styles.table__col__head}
                  ></th>
                  <th className={styles.table__col__head}>Label</th>
                  <th className={styles.table__col__head}>Time</th>
                  <th className={styles.table__col__head}>Recorded</th>
                  <th
                    role="presentation"
                    className={styles.table__col__head}
                  ></th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {this.state.timeTable.map((item) => {
                  return (
                    <tr
                      className={styles.tbody__row}
                      key={item.id}
                      id={item.id}
                    >
                      <td
                        className={[styles.table__col__body, styles.index].join(
                          " "
                        )}
                      >
                        #{item.number}
                      </td>
                      <td
                        className={[
                          styles.table__col__body,
                          styles.label_edit,
                        ].join(" ")}
                      >
                        {item.result}
                        ...
                        <i
                          className="fas fa-pencil-alt"
                          style={{ fontSize: ".8rem" }}
                        ></i>
                        {/* <input type="text" class="input" /> */}
                      </td>
                      <td
                        className={[styles.table__col__body, styles.total].join(
                          " "
                        )}
                      >
                        {item.time}
                      </td>
                      <td
                        className={[styles.table__col__body, styles.time].join(
                          " "
                        )}
                      >
                        {item.date}
                      </td>
                      <td
                        className={[
                          styles.table__col__body,
                          styles.action,
                        ].join(" ")}
                      >
                        <button
                          type="button"
                          title="Remove"
                          className={styles.action__remove}
                          onClick={(e) => this.removeHandler(e)}
                        >
                          &#10006;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Result;
