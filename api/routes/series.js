module.exports  = app => {
  const controller = app.controllers.series;

  app.route('/api/series')
    .get(controller.listarSeries)
    .post(controller.salvarSeries);

  app.route('/api/series/:serieID')
    .put(controller.alterarSerie)
    .delete(controller.removerSeries);
}