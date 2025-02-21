'use strict';

const statistics = new Statistics();

const data = {
  pageVisits: [],
  registrationClicks: [],
  dataSubmissions: [],
  completedRegistrations: [],
  telegramSubscriptions: []
};

// Statistikani hisoblash
async function calculateStats(startDate, endDate) {
  const start = startDate ? new Date(startDate).getTime() : 0;
  const end = endDate ? new Date(endDate).getTime() : Infinity;

  const [
    pageVisits,
    registrationClicks,
    dataSubmissions,
    completedRegistrations,
    telegramSubscriptions
  ] = await statistics.getStatisticsData()

  data.pageVisits = pageVisits;
  data.registrationClicks = registrationClicks;
  data.dataSubmissions = dataSubmissions;
  data.completedRegistrations = completedRegistrations;
  data.telegramSubscriptions = telegramSubscriptions;


  const stats = {
    pageVisits: data.pageVisits.filter(item => item.time >= start && item.time <= end).length,
    registrationClicks: data.registrationClicks.filter(item => item.time >= start && item.time <= end).length,
    dataSubmissions: data.dataSubmissions.filter(item => item.time >= start && item.time <= end).length,
    completedRegistrations: data.completedRegistrations.filter(item => item.time >= start && item.time <= end).length,
    telegramSubscriptions: data.telegramSubscriptions.filter(item => item.time >= start && item.time <= end).length
  };

  return stats;
}

// Jadval yangilash
async function updateTable(stats) {
  const tbody = document.getElementById('statsTable');
  tbody.innerHTML = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Saytga kirganlar</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stats.pageVisits}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ro'yxatdan o'tish tugmasini bosganlar</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stats.registrationClicks}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ma'lumotlarini yuborganlar</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stats.dataSubmissions}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ro'yxatdan o'tganlar</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stats.completedRegistrations}</td>
                </tr>
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Telegram kanalga obuna bo'lganlar</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stats.telegramSubscriptions}</td>
                </tr>
            `;
}

// Filter tugmasi bosilganda
document.getElementById('filterBtn').addEventListener('click', async () => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const stats = await calculateStats(startDate, endDate);
  await updateTable(stats);
});

(async () => {
  const stats = await calculateStats();
  await updateTable(stats);
})()

