export default {
  name: "phone",
  title: "Phone",
  type: "string",
  validation: (Rule) =>
    Rule.regex(
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i,
      {
        name: "phone", // Error message is "Does not match phone-pattern"
        invert: false, // Boolean to allow any value that does NOT match pattern
      }
    ),
};
