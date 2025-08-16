export function setDatePreserveTime(
  original: Date | undefined,
  newDateOnly: Date,
  options?: { isEndDate?: boolean; compareTo?: Date }
): Date {
  if (!original) return new Date(newDateOnly);

  const updated = new Date(newDateOnly);
  updated.setHours(original.getHours());
  updated.setMinutes(original.getMinutes());
  updated.setSeconds(original.getSeconds());
  updated.setMilliseconds(original.getMilliseconds());

  if (options?.isEndDate && options.compareTo && updated < options.compareTo) {
    console.warn("End date must not be before start date");
    return original;
  }

  return updated;
}

export function setTimePreserveDate(
  original: Date | undefined,
  newTimeOnly: Date,
  options?: { isEndTime?: boolean; compareTo?: Date }
): Date {
  if (!original) return new Date(newTimeOnly);

  const updated = new Date(original);
  updated.setHours(newTimeOnly.getHours());
  updated.setMinutes(newTimeOnly.getMinutes());
  updated.setSeconds(newTimeOnly.getSeconds());
  updated.setMilliseconds(newTimeOnly.getMilliseconds());

  if (
    options?.isEndTime &&
    options.compareTo &&
    updated.getTime() <= options.compareTo.getTime()
  ) {
    console.warn("End time must be after start time");
    return original;
  }

  return updated;
}
