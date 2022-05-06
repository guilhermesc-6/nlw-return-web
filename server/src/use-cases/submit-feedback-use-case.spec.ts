import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies

const createFeedbackSpy = jest.fn();
const senMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: senMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "comment exemple",
        screenshot: "data:image/png;base64,safsdsf9a6ff67a7",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(senMailSpy).toBeCalled();
  });

  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "comment exemple",
        screenshot: "data:image/png;base64,safsdsf9a6ff67a7",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,safsdsf9a6ff67a7",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with a screenshot invalid format", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "comment exemple",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
