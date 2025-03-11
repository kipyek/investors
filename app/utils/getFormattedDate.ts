export const formatDate = (date: Date) => {
  const formatDate = date.toISOString().split('T')[0]
  const formattedDate = new Date(formatDate)
  return formattedDate;
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export const startOfYear = new Date(currentYear, 0, 1);

export const endOfYear = new Date(currentYear, 11, 31);

export const investorPaymentData = () => {

}