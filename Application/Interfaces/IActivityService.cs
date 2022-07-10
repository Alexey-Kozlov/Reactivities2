using Domain;

namespace Application.Interfaces
{
    public interface IActivityService
    {
        Task<List<Activity>> List();
        Task<Activity> Details(Guid id);
        Task Create(Activity activity);
        Task<bool> Edit(Activity activity);
        Task<bool> Delete(Guid Id);
    }
}
