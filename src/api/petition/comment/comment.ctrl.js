import models from '../../../models';
import colorConsole from '../../../lib/console';

export const writeComment = async (req, res) => {
  try {

  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      messaga: '서버 에러!',
    };

    res.status(500).json(result);
  }
};
