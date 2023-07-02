export function formatDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate();
	let daySuffix;
	if (day === 1 || day === 21 || day === 31) {
	  daySuffix = 'st';
	} else if (day === 2 || day === 22) {
	  daySuffix = 'nd';
	} else if (day === 3 || day === 23) {
	  daySuffix = 'rd';
	} else {
	  daySuffix = 'th';
	}
	const formattedDate = `${day}${daySuffix} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
	return formattedDate;
  }

  