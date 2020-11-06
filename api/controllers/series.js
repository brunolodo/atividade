const uuidv4 = require('uuid/v4');


module.exports = app => {
  
  const db = app.data.series;
  const controller = {};

  const { series } = db;

  controller.listarSeries = (req, res) => {
    res.status(200).json(db);
  } 

  controller.salvarSeries = (req, res) => {
    series.data.push({
      id: uuidv4(),
      titulo: req.body.titulo,
      dataLancamento: req.body.dataLancamento,
      faixaEtaria: req.body.faixaEtaria,
      genero: req.body.genero,
      createAt: new Date()
    });

    res.status(201).json(series);
  }

  controller.removerSeries = (req, res) => {
    const { serieID } = req.params;

    const serieIndex = series.data.findIndex(serie => serie.id === serieID);

    if(serieIndex === -1){
      res.status(404).json({
        mensagem: 'Série não encontrada',
        success: false,
        series: series,
      });
    }else {
      series.data.splice(serieIndex, 1);
      res.status(200).json({
        mensagem: 'Série removida com sucesso',
        success: true,
        series: series,
      });
    }
  }

  controller.alterarSerie = (req, res) => {
    const { serieID } = req.params;

    const serieIndex = series.data.findIndex(serie => serie.id ===serieID);

    if(serieIndex === -1){
      res.status(404).json({
        mensagem: 'Série não encontrada',
        success: false,
        series: series,
      });
    }else {
      const novaSerie = {
        id: serieID,
        titulo: req.body.titulo,
        dataLancamento: req.body.dataLancamento,
        faixaEtaria: req.body.faixaEtaria,
        genero: req.body.genero,
        updatedAt: new Date()
      };

      series.data.splice(serieIndex, 1, novaSerie);

      res.status(200).json({
        mensagem: 'Série atualizada com sucesso',
        success: true,
        series: series,
      });
    }
  }

  return controller;

}