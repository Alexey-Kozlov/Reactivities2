import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import { addHours, format } from "date-fns";
import { ru } from 'date-fns/locale'

export default class ActivityStore {

    activityRegistry = new Map<string,IActivity>();
    selectedActivity: IActivity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            new Date(a.date!).getTime() - new Date(b.date!).getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(new Date(activity.date!), 'dd.MM.yyyy', { locale: ru });
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key : string] : IActivity[]})
        )
    }

    loadActivities = async () => {
        try {
            this.setLoadingInitial(true);
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
                this.setLoadingInitial(false);
            });
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string ) => {
        let activity: IActivity  = {
            id: '',
            title: '',
            category: '',
            description: '',
            city: '',
            date: null,
            venue: ''
        }
        if (id.length === 0) {
            this.setSelectedActivity(activity);
            this.setLoadingInitial(false);
            return activity;
        }
        activity = this.getActivity(id)!;
        if (activity) {
            this.setSelectedActivity(activity);
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                const activity = await agent.Activities.detail(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.setSelectedActivity(activity);
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: IActivity) => {
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (value: boolean) => {
        this.loadingInitial = value;
    }

   createActivity = async (activity: IActivity) => {
       this.loading = true;
       activity.date = addHours(activity.date!, 3);
        try {
            await agent.Activities.create(activity);
            activity.date = addHours(activity.date!, -3);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.setSelectedActivity(activity);
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: IActivity) => {
        this.loading = true;
        activity.date = addHours(activity.date!, 3);
        try {
            await agent.Activities.edit(activity);
            activity.date = addHours(activity.date!, -3);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.setSelectedActivity(activity);
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    setSelectedActivity = (activity: IActivity) => {
        this.selectedActivity = activity;
    }
}