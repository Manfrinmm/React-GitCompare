import React from "react";
import PropTypes from "prop-types";

import { Container, Repository, Tela } from "./styles";
import { MdUpdate, MdDeleteForever } from "react-icons/md";

const CompareList = ({ repo, onDelete, onUpdate }) => (
  <Container>
    <Repository key={repo.id}>
      <Tela>
        <button onClick={onUpdate}>
          <MdUpdate size={26} color="#00ff00" />
        </button>
        <button onClick={onDelete}>
          <MdDeleteForever size={26} color="#f66" />
        </button>
      </Tela>
      <header>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <strong>{repo.name}</strong>
        <small>{repo.owner.login}</small>
      </header>
      <ul>
        <li>
          {repo.stargazers_count} <small>stars</small>
        </li>
        <li>
          {repo.forks_count} <small>forks</small>
        </li>
        <li>
          {repo.open_issues_count} <small>issues</small>
        </li>
        <li>
          {repo.lastCommit} <small>last commit</small>
        </li>
      </ul>
    </Repository>
  </Container>
);

CompareList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string
    })
  ).isRequired
};

export default CompareList;
