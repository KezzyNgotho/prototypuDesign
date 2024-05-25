import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import { searchLearnersByName } from "../../../../api/teams/teams";
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

class ParticipantSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      search: "",
      availableParticipants: [],
      selectedParticipants: [],
    };
  }

  componentDidMount() {
    // API call
    this.fetchParticipants();
  }

  fetchParticipants = () => {
    const { search } = this.state;

    searchLearnersByName(search)
      .then((res) =>
        this.setState({ availableParticipants: res.data, error: null })
      )
      .catch((error) => {
        console.error(error);
      });
  };

  handleSearchChange = (event) => {
    const searchValue = event.target.value;
    this.setState({ search: searchValue }, () => {
      this.fetchParticipants();
    });
  };

  handleTagClick = (participantId) => {
    const { availableParticipants, participants, selectedParticipants } =
      this.state;
    const participant = availableParticipants.find(
      (p) => p.id === participantId
    );
    if (participant && !participants.includes(participant.id)) {
      const newParticipants = [...participants, participant.id];
      const pickedParticipants = [...selectedParticipants, participant];
      this.setState({
        participants: newParticipants,
        search: "",
        selectedParticipants: pickedParticipants,
      });
    } else {
      this.setState({
        search: "",
      });
    }
  };

  handleTagRemove = (participantId) => {
    const { participants, selectedParticipants } = this.state;
    const newParticipants = selectedParticipants.filter(
      (p) => p.id !== participantId
    );
    const participantIds = newParticipants.map((p) => p.id);
    this.setState({
      participants: participantIds,
      selectedParticipants: newParticipants,
    });
  };

  render() {
    const {
      participants,
      search,
      availableParticipants,
      selectedParticipants,
    } = this.state;

    this.props.func(participants);

    return (
      <div>
        <input
          type="text"
          value={search}
          onChange={this.handleSearchChange}
          placeholder="Search participants..."
          className="focus:outline-none text-xs mb-4 border-gray-300 border p-4 w-[400px] rounded"
        />
        <ul>
          {search !== ""
            ? availableParticipants
                .filter((participant) =>
                  participant.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((participant) => (
                  <li
                    style={{
                      cursor: "pointer",
                      transition: "cursor 0.3s ease-in-out",
                    }}
                    key={participant.id}
                    onClick={() => this.handleTagClick(participant.id)}
                  >
                    {participant.name}
                  </li>
                ))
            : null}
        </ul>
        <Box
          Paper
          sx={{
            position: "relative",
            right: "250px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {selectedParticipants.map((participant) => (
            <ListItem key={participant.id}>
              <Chip
                label={participant.name}
                color="primary"
                variant="outlined"
                onDelete={() => this.handleTagRemove(participant.id)}
              />
            </ListItem>
          ))}
        </Box>
      </div>
    );
  }
}

export default ParticipantSelector;
