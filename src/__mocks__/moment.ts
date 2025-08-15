const moment = jest.fn((date: Date) => ({
  format: jest.fn((format: string) => {
    if (format === "ddd, MMM Do") {
      return "Mon, Jan 15th";
    }
    if (format === "h:mm A") {
      return "2:30 PM";
    }
    return "formatted date";
  }),
}));

export default moment;

