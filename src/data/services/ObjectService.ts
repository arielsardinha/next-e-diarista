export const ObjectService = {
    jsonToFormData(data: any): FormData {
        const formData = new FormData();
        formData.append('nome', '');

        for (const key in data) {
            formData.append(key, data[key]);
        }

        return formData;
    },
};
