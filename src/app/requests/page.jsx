import RequestCard from '@/components/RequestCard';

function RequestsPage() {
    const data = {
        _id: '6589951370426ab9a1894bb8',
        material: {
            fileID: '1QpBoohu5j1DRhiKTrWwcVGQree2g-3Ci',
            courseName: 'Design and Analysis of Algorithms',
            materialType: 'Exam Question Paper',
            exam: 'Insem-I',
            year: 2019,
            _id: '6589951370426ab9a1894bb7',
        },
        studentID: '202101048',
        status: 'REQUESTED',
        requestTime: '2023-12-25T14:43:28.256Z',
        __v: 0,
    }
    return (
      <div class="left-0 top-0 -z-10 h-full w-full">
        <RequestCard data={data} />
      </div>
    )
}

export default RequestsPage
