import { useEffect, useContext, useState } from "react";
import AppContext from "../context/Appcontext";
import { Input, Space, Select } from "antd";
const { Search } = Input;
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "./assets/Loader";
import {
  LineChartOutlined,
  TableOutlined,
  SearchOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Table } from "@nextui-org/react";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, loading, setLoading } = useContext(AppContext);
  const [tableData, setTableData] = useState();
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");
    }
  }, []);
  const getTable = () => {
    axios
      .get(
        "https://frontendtestapi.staging.fastjobs.io/data?page1&results=10",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data);
        setTableData(res.data);
        setLoading(false);
        // setData(res.data)
      });
  };
  useEffect(() => {
    setLoading(true);
    getTable();
  }, []);
  if (loading == true) {
    return <Loader />;
  }
  return (
    <>
      <div className="table-container">
        <div>
          <span className="table-heading">Graphic Designer</span>
          <FormOutlined />
        </div>
        <div className="table-menu">
          <div>
            <span>
              <TableOutlined style={{ marginRight: "5px" }} />
              Table View
            </span>
            <span style={{ marginLeft: "20px" }}>
              <LineChartOutlined style={{ marginRight: "5px" }} />
              Kanban
            </span>
          </div>
          <div>
            <input
              type="text"
              placeholder="sort"
              style={{ border: "none", width: "50px" }}
            />
            <input
              type="text"
              placeholder="filter"
              style={{ border: "none", width: "50px" }}
            />
            <SearchOutlined style={{ marginRight: "10px", marginTop: "5px" }} />
            <input
              type="text"
              placeholder="Type to search"
              style={{ border: "none", width: "150px" }}
            />
            <button className="new-button">new</button>
            <select></select>
          </div>
        </div>
        <div>
          <Table
            aria-label="Example table with static content"
            css={{
              height: "80%",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>First Name</Table.Column>
              <Table.Column>Last Name</Table.Column>
              <Table.Column>Gender</Table.Column>
              <Table.Column>@Email</Table.Column>
            </Table.Header>
            <Table.Body>
              {tableData?.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.first_name}</Table.Cell>
                  <Table.Cell>{user.last_name}</Table.Cell>
                  <Table.Cell>{user.gender}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}
