import React, { Component, createRef } from "react";
import styles from "./../Result/Result.module.css";
import { v4 as uuidv4 } from "uuid";

class Result extends Component {
  // constructor() {
  //   super();
  //   this.textRef = createRef();
  // }
  state = {
    count: 1,
    timeTable: [],
  };

  // componentDidMount() {
  //   if (this.textRef.current !== null) {
  //     this.textRef.current.focus();
  //   }
  // }

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
          show: false,
          number: this.state.count,
          text: "result",
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

  clearallHandler() {
    this.setState({
      count: 1,
      timeTable: [],
    });
  }

  inputTextChange(e) {
    this.setState({
      ...this.state.timeTable.filter((item) => {
        if (item.id === e.target.parentNode.parentNode.parentNode.id) {
          item.text = e.target.value;
        }
        return item;
      }),
    });
  }

  editHandler(e) {
    this.setState({
      ...this.state.timeTable.filter((item) => {
        if (item.id === e.target.parentNode.parentNode.id) {
          item.show = true;
        }
        return item;
      }),
    });
  }
  saveInputValue(e) {
    this.setState({
      ...this.state.timeTable.filter((item) => {
        if (item.id === e.target.parentNode.parentNode.parentNode.id) {
          item.text = e.target.parentNode.firstChild.value;
          item.show = false;
        }
        return item;
      }),
    });
  }

  render() {
    return (
      <div className={styles.result}>
        {this.state.timeTable.length ? (
          <div className={styles.table_wrap}>
            <form>
              <label htmlFor="check" className={styles.label}>
                reverse
              </label>
              <input
                type="checkbox"
                className={styles.checkbox}
                id="check"
                onChange={(e) => this.reverseHandler(e)}
              />
            </form>
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
                        {item.show ? null : item.text}
                        ...
                        <i
                          className="fas fa-pencil-alt"
                          style={{ fontSize: ".8rem" }}
                          onClick={(e) => this.editHandler(e)}
                        ></i>
                        <div
                          className={styles.edit_input_wrap}
                          style={{
                            display: item.show ? "flex" : "none",
                          }}
                        >
                          <input
                            type="text"
                            className={styles.edit_input}
                            value={item.text}
                            onChange={(e) => this.inputTextChange(e)}
                            // autoFocus
                            // ref={this.textRef}
                          />
                          <i
                            className="fas fa-check-circle"
                            style={{
                              fontSize: "1rem",
                              color: "#04AA6D",
                              backgroundColor: "white",
                            }}
                            onClick={(e) => this.saveInputValue(e)}
                          ></i>
                        </div>
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
            <button
              className={styles.delete_btn}
              onClick={(e) => this.clearallHandler(e)}
            >
              clear all
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Result;
