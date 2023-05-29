export default function Loading(): JSX.Element {
  return (
    <section className="loading">
      {
        <>
          <p>Carregando...</p>
          <img src="https://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/loading.gif" alt="loading" width="50px" />
        </>

      }
    </section>
  )
};