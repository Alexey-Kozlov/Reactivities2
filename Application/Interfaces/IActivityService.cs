using Domain;
using Application.Core;

namespace Application.Interfaces
{
    public interface IActivityService
    {
        Task<Result<List<Activity>>> List();
        Task<Result<Activity>> Details(Guid id);
        Task<Result<object>> Create(Activity activity);
        Task<Result<bool>> Edit(Activity activity);
        Task<Result<bool>> Delete(Guid Id);
    }
}
