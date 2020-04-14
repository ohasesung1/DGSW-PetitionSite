import models from '../../models';
import * as colorConsole from '../../lib/console';
import * as validate from '../../lib/Validate/petition';

export const writePetition = async (req, res) => {
  try {
    const result = {
      status: 200,
      messaga: '!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      messaga: '서버 에러!',
    };

    res.status(500).json(result);
  }
};

export const readPetitions = async (req, res) => {
  try {
    const result = {
      status: 200,
      messaga: '!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      messaga: '서버 에러!',
    };

    res.status(500).json(result);
  }
};

export const updatePetition = async (req, res) => {
  try {
    const result = {
      status: 200,
      messaga: '!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      messaga: '서버 에러!',
    };

    res.status(500).json(result);
  }
};

export const deletePetition = async (req, res) => {
  try {
    const result = {
      status: 200,
      messaga: '!',
    };

    res.status(200).json(result);
  } catch (error) {
    colorConsole.red(error);

    const result = {
      status: 500,
      messaga: '서버 에러!',
    };

    res.status(500).json(result);
  }
};
