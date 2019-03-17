import React, { Component } from "react";

import { connect } from "react-redux";
import { Row, Col, Table, Input, Button, Icon } from "antd";
import { fetchLessonsRequest, fetchLessonsReset } from "./redux/ui/actions.js";
import boun from "./resources/bogazici.jpg";
import Highlighter from "react-highlight-words";

import { bindActionCreators } from "redux";
class TablePage extends Component {
  state = {
    searchText: ""
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  componentDidMount() {
    if (this.props.ui.lessons.length === 0) {
      this.props.fetchLessonsRequest();
    } else {
      console.log(this.props.ui.lessons);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { fetchLessonsInProgress, fetchLessonsHasError, fetchLessonsCompleted } = this.props.ui;
    if (!fetchLessonsInProgress && !fetchLessonsHasError && fetchLessonsCompleted) {
      this.props.fetchLessonsReset();
    }
  }

  render() {
    const columns = [
      {
        title: "Hours",
        dataIndex: "Hours",
        key: "Hours"
      },
      {
        title: "Monday",
        dataIndex: "Monday",
        key: "Monday"
      },
      {
        title: "Tuesday",
        dataIndex: "Tuesday",
        key: "Tuesday"
      },
      {
        title: "Wednesday",
        dataIndex: "Wednesday",
        key: "Wednesday"
      },
      {
        title: "Thursday",
        dataIndex: "Thursday",
        key: "Thursday"
      },
      {
        title: "Friday",
        dataIndex: "Friday",
        key: "Friday"
      }
    ];

    const data1 = [
      {
        key: "1",
        LecCode: "CMPE160",
        LecName: "OOP",
        Days: "FF",
        Hours: "34",
        Instructor: "bekir burak"
      },
      {
        key: "2",
        LecCode: "CMPE240",
        LecName: "Digital Design",
        Days: "ThTh",
        Hours: "12",
        Instructor: "bekir burak"
      },
      {
        key: "3",
        LecCode: "CMPE300",
        LecName: "algorithm anaysis",
        Days: "MM",
        Hours: "12",
        Instructor: "bekir burak"
      },
      {
        key: "4",
        LecCode: "IE310",
        LecName: "System simulation",
        Days: "TT",
        Hours: "56",
        Instructor: "bekir burak"
      },
      {
        key: "5",
        LecCode: "FA202",
        LecName: "Future Read",
        Days: "WW",
        Hours: "34",
        Instructor: "bekir burak"
      },
      {
        key: "6",
        LecCode: "PHYS202",
        LecName: "Phys",
        Days: "FF",
        Hours: "12",
        Instructor: "bekir burak"
      }
    ];

    const data = [
      {
        key: "1",
        Hours: "9-10",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "10-11",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "11-12",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "12-13",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "13-14",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "14-15",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "15-16",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "16-17",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      },
      {
        key: "1",
        Hours: "17-18",
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: ""
      }
    ];
    const columns1 = [
      {
        title: "LecCode",
        dataIndex: "LecCode",
        key: "LecCode",

        ...this.getColumnSearchProps("LecCode")
      },
      {
        title: "LecName",
        dataIndex: "LecName",
        key: "LecName",

        ...this.getColumnSearchProps("LecName")
      },
      {
        title: "Days",
        dataIndex: "Days",
        key: "Days"
      },
      {
        title: "Hours",
        dataIndex: "Hours",
        key: "Hours"
      },
      {
        title: "Instructor",
        dataIndex: "Instructor",
        key: "Instructor"
      }
    ];
    return (
      <div>
        <img
          src={boun}
          alt="Logo"
          style={{
            overflowY: "auto",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundSize: "cover",
            zIndex: -1,
            width: "100%",
            height: "100%"
          }}
        />
        <div
          style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, backgroundColor: "#00000090" }}
        />

        <div
          style={{
            marginTop: 30
          }}
        >
          <Row type="flex" justify="space-around">
            <Col span={10}>
              <div style={{ top: 0, left: 0, backgroundColor: "#FFFFFF90" }}>
                <Table bordered="true" columns={columns} dataSource={data} />
              </div>
            </Col>
            <Col span={10}>
              <div
                style={{
                  top: 0,
                  left: 0,
                  backgroundColor: "#FFFFFF90"
                }}
              >
                <Table bordered="true" columns={columns1} dataSource={data1} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
function mapStateToProps(appState, ownProps) {
  return {
    ui: appState.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        fetchLessonsRequest,
        fetchLessonsReset
      },
      dispatch
    )
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePage);
