import React, { Component } from "react";
import moment from "moment";
import CampareList from "../components/CompareList";

import logo from "../assets/logo.png";
import { Container, Form } from "./styles";

import api from "../config/api";

export default class Main extends Component {
  state = {
    repoInput: "",
    repos: [],
    loading: false,
    error: false
  };

  handleAddRepository = async e => {
    e.preventDefault();

    try {
      const { repos, repoInput, loading } = this.state;

      this.setState({ loading: true });

      const { data } = await api.get(`/repos/${repoInput}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repos: [...repos, data],
        repoInput: "",
        loading: false,
        error: false
      });
      // console.log(repos);
    } catch (error) {
      this.setState({
        loading: false,
        error: true
      });
      console.log(error);
    }
  };

  render() {
    const { repos, repoInput, loading, error } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare logo" />
        <Form error={error} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repoInput}
            onChange={e => this.setState({ repoInput: e.target.value })}
          />
          <button type="submit">
            {loading ? <i className="fa fa-spinner fa-pulse" /> : "OK"}
          </button>
        </Form>
        <CampareList repos={repos} />
      </Container>
    );
  }
}
