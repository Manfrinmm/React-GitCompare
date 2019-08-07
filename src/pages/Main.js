import React, { Component } from "react";
import moment from "moment";
import CampareList from "../components/CompareList";

import logo from "../assets/logo.png";
import { Container, Form, List } from "./styles";

import api from "../config/api";

export default class Main extends Component {
  state = {
    repoInput: "",
    repos: JSON.parse(localStorage.getItem("@GitCompare:repos")) || [],
    loading: false,
    error: false
  };

  handleAddRepository = async e => {
    e.preventDefault();

    try {
      const { repos, repoInput } = this.state;

      this.setState({ loading: true });

      const { data } = await api.get(`/repos/${repoInput}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repos: [...repos, data],
        repoInput: "",
        loading: false,
        error: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true
      });
    }
  };

  componentDidUpdate(_, prevState) {
    const { repos } = this.state;
    if (prevState.repos !== repos) {
      localStorage.setItem("@GitCompare:repos", JSON.stringify(repos));
    }
  }
  handleRemove = id => {
    const { repos } = this.state;

    const data = repos.filter(repo => {
      if (repo.id !== id) return repo;
    });
    this.setState({ repos: data });
  };

  handleUpdate = async name => {
    const { repos } = this.state;

    this.setState({ loading: true });

    const { data } = await api.get(`/repos/${name}`);

    data.lastCommit = moment(data.pushed_at).fromNow();

    const repositories = repos.map(repo => {
      if (repo.id === data.id) return data;
      else return repo;
    });
    this.setState({
      repos: repositories,
      loading: false
    });
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
        <List>
          {repos.map(repo => (
            <CampareList
              repo={repo}
              onDelete={() => {
                this.handleRemove(repo.id);
              }}
              onUpdate={() => {
                this.handleUpdate(repo.full_name);
              }}
            />
          ))}
        </List>
      </Container>
    );
  }
}
