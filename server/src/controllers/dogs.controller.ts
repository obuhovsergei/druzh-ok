import { Request, Response } from 'express';
import { Dog } from '@/models/dog.model';
import { IWalkRequest } from '@/interfaces/dog.interface';

interface AuthenticatedRequest extends Request {
  user: {
    _id: string;
    role: string;
  };
  files?: Express.Multer.File[];
}

export const createDog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, breed, age } = req.body;
    const owner = req.user._id;

    // Проверка и обработка файлов
    const photos = req.files
      ? req.files.map((file: Express.Multer.File) => file.path)
      : [];

    const dog = await Dog.create({
      name,
      breed,
      age,
      owner,
      photos
    });

    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating dog' });
  }
};

export const getDogs = async (req: Request, res: Response) => {
  try {
    const dogs = await Dog.find().populate('owner', 'firstName lastName');
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dogs' });
  }
};

export const createWalkRequest = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dogId } = req.params;
    const walker = req.user._id;
    const { date, duration, price, address } = req.body;

    const walkRequest: IWalkRequest = {
      walker,
      status: 'pending',
      date: new Date(date),
      duration,
      price,
      address
    };

    const dog = await Dog.findByIdAndUpdate(
      dogId,
      { $push: { walkRequests: walkRequest } },
      { new: true }
    ).populate('owner', 'email');

    res.json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating walk request' });
  }
};

export const updateWalkStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { dogId, requestId } = req.params;
    const { status } = req.body;
    const owner = req.user._id;

    const dog = await Dog.findOneAndUpdate(
      {
        _id: dogId,
        owner,
        'walkRequests._id': requestId
      },
      { $set: { 'walkRequests.$.status': status } },
      { new: true }
    );

    if (!dog) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating walk status' });
  }
};
