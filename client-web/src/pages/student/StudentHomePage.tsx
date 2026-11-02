import StudentLayout from '../../components/StudentLayout'

export default function StudentHomePage() {
  return (
    <StudentLayout>
      <section className="stu-welcome">
        <div>
          <h1>안녕하세요, 오늘도 좋은 레슨 되세요</h1>
          <p>원하는 레슨을 찾아 신청하고, 내 수업 일정을 한눈에 확인해 보세요.</p>
        </div>
        <button type="button" className="stu-btn" disabled title="곧 만나볼 수 있어요">
          레슨 찾기
        </button>
      </section>

      <div className="stu-grid">
        <section className="stu-card" aria-labelledby="stu-lessons-title">
          <div className="stu-card-head">
            <h2 id="stu-lessons-title">내 수업</h2>
          </div>
          <div className="stu-empty">
            <strong>아직 신청한 수업이 없어요</strong>
            <p>레슨을 찾아 신청하면 이곳에 모아서 보여 드려요.</p>
          </div>
        </section>

        <section className="stu-card" aria-labelledby="stu-schedule-title">
          <div className="stu-card-head">
            <h2 id="stu-schedule-title">다가오는 일정</h2>
          </div>
          <div className="stu-empty">
            <strong>예정된 일정이 없어요</strong>
            <p>수업이 확정되면 날짜와 시간이 표시돼요.</p>
          </div>
        </section>
      </div>
    </StudentLayout>
  )
}