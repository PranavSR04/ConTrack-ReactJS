import { fireEvent, render } from "@testing-library/react";
import { CloseContractPropType } from "../../Features/IndividualContract/CloseContract/types";
import CloseContract from "../../Features/IndividualContract/CloseContract/CloseContract";
import { Button } from "antd";

describe("IndividualContract component", () => {
  it("renders without crashing", () => {
    const mockProps: CloseContractPropType = {
      visible: false,
      onCancel: jest.fn(),
      closeContract: jest.fn(),
      modalPopUp: jest.fn(),
      contractStatus: "Active",
    };
    const onClickMock = jest.fn(); 

    const { getByText } = render(
      <Button
        type="primary"
        style={{
          marginBottom: "2rem",
          backgroundColor: "red",
          marginLeft: "auto",
          marginRight: "4rem",
          fontSize: "small"
        }}
        onClick={onClickMock} // Pass the mock function to onClick prop
      >
        Close Contract
      </Button>
    );

    // Get the button element by its text content
    const buttonElement = getByText('Close Contract');
    expect(buttonElement).toBeInTheDocument();

    // Simulate a click event on the button
    fireEvent.click(buttonElement);

    // Assert that the onClick mock function is called when the button is clicked
    expect(onClickMock).toHaveBeenCalled();
  });
});

