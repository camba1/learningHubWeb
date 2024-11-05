export function get_standard_options( sort_by: string = '', sort_order = 'asc',
																			created_by: string = '', updated_by: string = '' ): { [key: string]: string }{

	const options: { [key: string]: string } = {}
	if (sort_by) options['sort_by']= sort_by;
	if (sort_order) options['sort_order'] = sort_order;
	if (created_by) options['created_by'] = created_by;
	if (updated_by) options['updated_by'] = updated_by;
	return options
}

export function stringToEncoded(str: string) {
	const urlEncodedRegex = /%[0-9A-Fa-f]{2}/;

	if(urlEncodedRegex.test(str)){
		return str;
	} else {
		return encodeURIComponent(str);
	}
}