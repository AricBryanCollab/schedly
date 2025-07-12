import { CalendarController } from "@/internal/calendaritem/controller";
import { CalendarRepository } from "@/internal/calendaritem/repository";
import { CalendarService } from "@/internal/calendaritem/service";

const calendarRepository = new CalendarRepository();

const calendarService = new CalendarService(calendarRepository);

export const calendarController = new CalendarController(calendarService);
