package de.fhws.applab.fiwmodules.api.states;

import de.fhws.applab.fiwmodules.models.Lecturer;
import de.fhws.applab.fiwmodules.models.LecturerFactory;
import de.fhws.applab.norbury.core.api.caching.CachingType;
import de.fhws.applab.norbury.core.api.states.get.AbstractGetState;
import de.fhws.applab.norbury.core.database.dao.results.SingleModelDatabaseResult;
import static de.fhws.applab.fiwmodules.api.states.TransitionHelper.*;
/**
 * Created by braunpet on 21.04.16.
 */
public class GetOneLecturer extends AbstractGetState<Lecturer>
{
	public GetOneLecturer( )
	{
		super( );
	}

	@Override protected void configureState( )
	{
		super.configureState( );
		setHttpCachingType( CachingType.VALIDATION_ETAG );
	}

	@Override protected SingleModelDatabaseResult<Lecturer> loadModelFromDatabase( )
	{
		final LecturerFactory lecturerFactory = LecturerFactory.getInstance( );
		return new SingleModelDatabaseResult<>( lecturerFactory.getById( this.requestedId ) );
	}

	@Override protected void defineTransitionLinks( )
	{
		addLink( queryTemplate(), queryRelationType() );
	}
}
