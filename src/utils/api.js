import axios from 'axios';

const KpiApi = axios.create({
  baseURL:
    'https://autoease.icomplete.com/account/bespoke/60316/dashboard/kpi/getData',
});

export const getMonthData = async (month) => {
  try {
    const { data } = await KpiApi.get('', { params: { inmonth: month } });
    return data;
  } catch (err) {
    console.log('err:', err);
  }
};
