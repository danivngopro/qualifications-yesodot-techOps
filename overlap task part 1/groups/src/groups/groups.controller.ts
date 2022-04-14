import { Request, Response } from 'express';
import { Group } from '../groups/groups.interface';
import { GroupManager } from './groups.manager';


export class GroupController {
  static async create(req: Request, res: Response): Promise<void> {
    res.json(await GroupManager.create(req.body));
  }

  static async findGroupByID(req: Request, res: Response): Promise<void> {
    const groupId = req.params.id as string;
    res.json(await GroupManager.findGroupByID(groupId));
  }
  
  static async updateGroupByID(req: Request, res: Response): Promise<void> {
    const groupId = req.params.id as string;
    const postData = req.body as Group;
    res.json(await GroupManager.updateGroupByID(groupId, postData));
  }

  static async deleteGroupByID(req: Request, res: Response): Promise<void> {
    const groupId = req.params.id as string;
    res.json(await GroupManager.deleteGroupByID(groupId));
  }

  static async addPerson(req: Request, res: Response): Promise<void> {
    const groupId = req.params.id as string;
    const personId = req.body.personId as string;
    res.json(await GroupManager.addPerson(groupId, personId));
  }

  static async addSubgroup(req: Request, res: Response): Promise<void> {
    const mainGroupId = req.params.id as string;
    const becomeASubgroupId = req.body.groupId as string;
    if(!becomeASubgroupId){
      const subgroup = req.body as Group;
      const subgroupId = (await GroupManager.create(subgroup)).id as string;
      res.json(await GroupManager.addSubgroup(mainGroupId, subgroupId));
    }
    res.json(await GroupManager.addSubgroup(mainGroupId, becomeASubgroupId));
  }
}
