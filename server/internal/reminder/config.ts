import { ReminderController } from "@/internal/reminder/controller";
import { ReminderRepository } from "@/internal/reminder/repository";
import { ReminderService } from "@/internal/reminder/service";

const reminderRepository = new ReminderRepository();

const reminderService = new ReminderService(reminderRepository);

export const reminderController = new ReminderController(reminderService);
