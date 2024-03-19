import { MilestonesPropType } from "../../Features/IndividualContract/Milestones/types";
import Milestones from "../../Features/IndividualContract/Milestones/Milestones";
import { render } from "@testing-library/react";

describe("IndividualContract component", () => {
  it("renders without crashing", () => {
    const mockProps: MilestonesPropType = {
      isCompletedCount: 2,
      milestones: [
        {
          id: 1,
          contract_id: 1,
          milestone_desc: "First milestone",
          milestone_enddate: "2024-03-20",
          percentage: "25.00",
          amount: "5000",
          created_at: "2024-03-16T15:21:58.000000Z",
          updated_at: "2024-03-16T15:21:58.000000Z",
        },
        {
          id: 2,
          contract_id: 1,
          milestone_desc: "Second milestone",
          milestone_enddate: "2024-04-20",
          percentage: "50.00",
          amount: "10000",
          created_at: "2024-03-16T15:21:58.000000Z",
          updated_at: "2024-03-16T15:21:58.000000Z",
        },
      ],
    };

    //   render(<Milestones {...mockProps} />);
    const { getByText } = render(<Milestones {...mockProps} />);

    // Convert isCompletedCount to a string before passing it to getByText
    const isCompletedCountString = mockProps.isCompletedCount.toString();
    const h5Element = getByText(isCompletedCountString);
    expect(h5Element).toBeInTheDocument();
  });
});
