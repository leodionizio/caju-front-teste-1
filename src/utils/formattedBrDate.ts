export const getFormattedBrDate = (dateString: string): string => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(`${dateString}T00:00:00`));
};
