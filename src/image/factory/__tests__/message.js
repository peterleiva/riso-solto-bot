import { messageFactory } from "../messages.js";

test("creates message factory", async () => {
  const factory = messageFactory();
  const dataset = await factory.create();

  expect(dataset).toBeInstanceOf(Array);
  expect(dataset[0]).toHaveProperty("type", "text");
  expect(dataset[0]).toHaveProperty("text");

  expect(dataset).toMatchSnapshot();
});
