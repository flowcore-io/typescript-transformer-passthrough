// -----------------------------------------------------------------------------
// Purpose: Transform entrypoint
// this is the entrypoint that will be called when the transformer is invoked
// to transform an event, the return value of this function will be passed to
// the read model adapter.
// -----------------------------------------------------------------------------

interface Input<T = any> {
  eventId: string;
  validTime: string;
  payload: T;
}

export default async function (input: Input) {
  const result: Record<string, unknown> = {};

  for (const key in input.payload) {
    if (Object.prototype.hasOwnProperty.call(input.payload, key)) {
      const value = input.payload[key];

      if (typeof value !== "string") {
        result[key] = JSON.stringify(value);
      } else {
        result[key] = value;
      }
    }
  }

  return {
    eventid: input.eventId,
    validtime: input.validTime,
    ...result,
  };
}
